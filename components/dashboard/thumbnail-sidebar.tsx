"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

interface Thumbnail {
  id: string;
  prompt: string;
  image_url: string;
  status: string;
  created_at: string;
}

const ImageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
    <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ThumbnailSidebar = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchThumbnails();

    // Set up real-time subscription for current user's thumbnails
    const supabase = createClient();

    const setupSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const channel = supabase
        .channel("thumbnails-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "thumbnails",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            console.log("Thumbnail change detected:", payload);
            // Refresh thumbnails list when any change occurs
            fetchThumbnails();
          }
        )
        .subscribe();

      return channel;
    };

    const channelPromise = setupSubscription();

    return () => {
      channelPromise.then((channel) => {
        if (channel) supabase.removeChannel(channel);
      });
    };
  }, []);

  const fetchThumbnails = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("thumbnails")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "completed")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Error fetching thumbnails:", error);
        return;
      }

      setThumbnails(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailClick = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const handleDownload = async (thumbnail: Thumbnail, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent thumbnail selection when clicking download

    try {
      const response = await fetch(thumbnail.image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `thumbnail-${thumbnail.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const handleDelete = async (thumbnail: Thumbnail, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent thumbnail selection when clicking delete

    // Confirm deletion
    if (!confirm(`Delete this thumbnail? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/thumbnails/${thumbnail.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete thumbnail");
      }

      // Remove from local state immediately for better UX
      setThumbnails((prev) => prev.filter((t) => t.id !== thumbnail.id));
    } catch (err) {
      console.error("Delete error:", err);
      alert(err instanceof Error ? err.message : "Failed to delete thumbnail");
    }
  };

  return (
    <div className="hidden lg:block fixed left-0 top-0 h-screen w-80 z-30 p-4">
      <div className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10">
              <ImageIcon />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">My Thumbnails</h2>
              <p className="text-sm text-gray-400">
                {thumbnails.length} {thumbnails.length === 1 ? "image" : "images"}
              </p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading...</p>
              </div>
            </div>
          ) : thumbnails.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center px-6">
                <ImageIcon />
                <p className="text-gray-400 mt-3">No thumbnails yet</p>
                <p className="text-sm text-gray-500 mt-1">
                  Create your first thumbnail to see it here
                </p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {thumbnails.map((thumbnail, index) => (
                <motion.div
                  key={thumbnail.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleThumbnailClick(thumbnail.id)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedId === thumbnail.id
                      ? "ring-2 ring-cyan-500 scale-[1.02]"
                      : "hover:ring-2 hover:ring-white/20"
                  }`}
                >
                  <div className="relative aspect-video bg-black/20">
                    <Image
                      src={thumbnail.image_url}
                      alt={thumbnail.prompt}
                      fill
                      className="object-contain"
                      sizes="320px"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-xs text-white/90 line-clamp-2">
                          {thumbnail.prompt}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(thumbnail.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {/* Action buttons */}
                      <div className="absolute top-2 left-2 flex gap-2">
                        <button
                          onClick={(e) => handleDownload(thumbnail, e)}
                          className="p-2 rounded-lg bg-black/50 hover:bg-cyan-500 text-white transition-colors duration-200"
                          title="Download thumbnail"
                        >
                          <DownloadIcon />
                        </button>
                        <button
                          onClick={(e) => handleDelete(thumbnail, e)}
                          className="p-2 rounded-lg bg-black/50 hover:bg-red-500 text-white transition-colors duration-200"
                          title="Delete thumbnail"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Selected indicator */}
                  {selectedId === thumbnail.id && (
                    <motion.div
                      layoutId="selected-indicator"
                      className="absolute top-2 right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};
