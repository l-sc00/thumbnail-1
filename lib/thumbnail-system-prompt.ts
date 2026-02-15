/**
 * YouTube Thumbnail Generation System Prompt (2026)
 *
 * Based on:
 * - Google Gemini Nano Banana prompting best practices
 * - YouTube thumbnail CTR optimization research (2026)
 * - Professional photography and composition principles
 */

export function enhanceThumbnailPrompt(userInput: string): string {
  const input = (userInput || "").trim();

  // CRITICAL: Start with explicit image generation instruction
  const imageGenPrefix = "Generate a professional YouTube thumbnail image showing: ";

  // Detect content style and characteristics
  const isAnimeStyle = /anime|애니|manga|만화|cartoon|일러스트|illustration|픽셀|pixel|마인크래프트|minecraft|로블록스|roblox/i.test(input);
  const hasPerson = /person|people|human|face|사람|인물|얼굴|표정|유튜버|아이돌|선수|셀카|내사진|streamer|gamer|creator|host|여자|남자|감정|emotion|바이럴/i.test(input);
  const textMatch = input.match(/["'「」『』](.+?)["'」』]/);
  const hasExplicitText = textMatch !== null;

  // Check if user provided a detailed, professional prompt
  const hasPhotographyTerms = /lens|mm|bokeh|rim light|depth of field|cinematic|studio lighting|key light|softbox|composition|rule of thirds|negative space|foreground|background|wide-angle|macro|low-angle|shot/i.test(input);
  const isDetailedPrompt = input.length > 150 || hasPhotographyTerms;

  if (isDetailedPrompt) {
    // User is already using professional language - just add YouTube optimization
    return `${imageGenPrefix}${input}. 16:9 aspect ratio, 1280x720 pixels. Single clear focal subject with high contrast. Professional color grading, crisp sharp focus.`;
  }

  // === CORE STRATEGY: Describe scenes, not keywords ===
  // Following Nano Banana principle: Deep language understanding > disconnected word lists

  // 1. DEFINE VISUAL STYLE
  const visualStyle = isAnimeStyle
    ? "high-end anime illustration style with clean linework, vibrant saturated colors, dramatic cel-shaded lighting, and bold outlines"
    : "photorealistic cinematic style with ultra-detailed textures, realistic skin rendering, professional color grading, and dramatic studio lighting setup";

  // 2. BUILD SUBJECT DESCRIPTION
  let sceneDescription = "";

  if (hasPerson) {
    // YouTube thumbnails with faces increase CTR by 20-30%
    const emotion = getExpressiveEmotion(input);
    sceneDescription = `A ${visualStyle}. The scene features a close-up portrait shot (head and shoulders framing) of a person displaying a strong ${emotion} facial expression. The subject maintains direct eye contact with the camera, creating immediate viewer connection. Shot with a slight wide-angle perspective at eye level to feel intimate and engaging. The face is illuminated by a professional three-point lighting setup: a soft key light from 45 degrees creating dimension, a subtle fill light to soften shadows, and a rim light from behind adding separation from the background. The lighting emphasizes facial features and expression clarity.`;
  } else {
    // Object or concept thumbnail
    sceneDescription = `A ${visualStyle}. The main subject is ${input}, prominently positioned and instantly recognizable within the frame. Shot with deliberate camera positioning to maximize visual impact - using a medium shot perspective that fills the frame while maintaining breathing room. The subject is lit with dramatic directional lighting that creates strong depth and three-dimensionality through controlled shadows and highlights.`;
  }

  // 3. BACKGROUND STRATEGY (Critical for CTR)
  // Research shows: dark backgrounds + bright subjects = higher visibility
  const backgroundSpec = hasPerson
    ? "The background is a simple, uncluttered gradient or solid color field that provides maximum contrast with the subject. If using a dark background, ensure the subject is well-lit and pops forward. Keep background elements to an absolute minimum - zero to one supporting element maximum - to maintain the 'one subject, one message, one second' rule."
    : "Set against a clean, high-contrast background with deliberate negative space. Use color psychology: dark backgrounds (charcoal, deep blue, black) to make bright subjects advance forward, or vibrant solid colors that complement but don't compete with the main subject. Background should be intentionally simple - avoid clutter or competing visual elements.";

  // 4. TEXT OVERLAY (Maximum 4 words for optimal CTR)
  let textSpec = "";
  if (hasExplicitText && textMatch) {
    const userText = textMatch[1];
    const wordCount = userText.split(/\s+/).length;
    if (wordCount <= 4) {
      textSpec = `Overlay bold, high-impact text reading "${userText}" using a thick sans-serif typeface (similar to Impact or Montserrat Black). The text is rendered in bright white with a 3-4 pixel black stroke outline for maximum readability against any background. Position the text in the upper third of the frame or along the left/right edge, avoiding the bottom 15% where YouTube UI elements appear. The text should be large enough to read clearly on mobile devices. Ensure text doesn't obscure the subject's face or key visual elements.`;
    } else {
      textSpec = `Note: The text "${userText}" exceeds the optimal 4-word limit for YouTube thumbnails. Consider shortening for maximum CTR. If text must be included, use a bold sans-serif font in white with black outline, positioned in the upper portion of frame.`;
    }
  } else if (input.length < 50) {
    // Short input - suggest minimal text
    textSpec = `If text is needed, use maximum 3-4 words in a bold, high-impact sans-serif typeface (Impact or Montserrat Black) with bright white fill and 3-4px black stroke. Position in upper third of frame. Text should support but not dominate the visual. Remember: thumbnails with minimal text achieve 30% higher CTR.`;
  } else {
    textSpec = `Prioritize visual storytelling over text. If text must be added, limit to 4 words maximum in bold white font with black outline, positioned to not compete with the main subject.`;
  }

  // 5. COMPOSITION RULES (Following both Nano Banana and YouTube best practices)
  const compositionRules = `Composition follows the rule of thirds with the primary focal point positioned at a power intersection. Use bold, clean framing with intentional negative space. The image must communicate its entire message within one second of viewing - this is critical for YouTube's fast-scroll environment. Maintain maximum 3 distinct visual elements total (subject + text + one optional accent). Create strong visual hierarchy through size, contrast, and positioning.`;

  // 6. COLOR AND CONTRAST (Scientifically proven for CTR)
  const colorStrategy = `Color palette uses high saturation and strong contrast ratios. Employ bright accent colors (cyan, yellow, red, or electric blue) strategically to create visual 'hooks' that stop the scroll. Ensure subject-to-background contrast ratio is sufficient for the subject to 'pop' forward. Use complementary colors intentionally. Apply professional color grading that makes the image feel polished and intentional rather than raw or amateur.`;

  // 7. TECHNICAL SPECIFICATIONS
  const technicalSpecs = `Technical requirements: Generate image at exactly 1280x720 pixels (16:9 aspect ratio) for YouTube thumbnail specifications. The image must be precisely sized to match YouTube's recommended dimensions without any letterboxing or pillarboxing. Image must maintain clarity and impact when viewed at small sizes (mobile devices). Use crisp, tack-sharp focus on the primary subject with optional selective depth of field to isolate subject from background. Professional-grade image quality with high detail rendering. File size should be under 2MB. Ensure the final image works both as a large hero image and as a small thumbnail in YouTube's sidebar.`;

  // 8. CRITICAL OPTIMIZATION NOTES
  const optimizationNotes = `Critical optimizations: Single clear focal subject (no competing elements). Expressive human faces with direct eye contact dramatically increase CTR. Dark backgrounds make light subjects advance forward. Subtle glow or outline on subject (not heavy halos). Minimal, bold text (4 words maximum). Design for instant readability - the entire thumbnail story must be understood in under one second. Avoid visual clutter, competing messages, or ambiguous compositions.`;

  // ASSEMBLE FINAL PROMPT
  // Using paragraph format rather than keyword lists (Nano Banana principle)
  const finalPrompt = `${imageGenPrefix}${sceneDescription} ${backgroundSpec} ${textSpec} ${compositionRules} ${colorStrategy} ${technicalSpecs} ${optimizationNotes}`;

  return finalPrompt;
}

/**
 * Maps user input to expressive emotions optimized for YouTube CTR
 * Emotions should be strong, clear, and readable even at thumbnail size
 */
function getExpressiveEmotion(input: string): string {
  const lowerInput = input.toLowerCase();

  // Map to high-impact, thumbnail-optimized expressions
  if (/shock|surprise|놀란|충격|amazed|wow/i.test(lowerInput)) {
    return "surprised and captivated, with eyes wide and eyebrows raised, mouth forming an authentic 'O' shape";
  }
  if (/excit|happy|기쁜|신난|joy|celebrat/i.test(lowerInput)) {
    return "genuinely excited and joyful, with a bright authentic smile and energetic presence";
  }
  if (/angry|mad|화난|분노|frustrated|annoyed/i.test(lowerInput)) {
    return "intensely determined and focused, with furrowed brow and strong, purposeful gaze";
  }
  if (/sad|cry|슬픈|우는|disappoint/i.test(lowerInput)) {
    return "contemplative and emotionally engaged, with thoughtful, sincere expression";
  }
  if (/serious|determined|진지|confident|powerful/i.test(lowerInput)) {
    return "seriously confident and commanding, with direct piercing gaze and strong presence";
  }
  if (/curious|wonder|궁금|thinking|confused/i.test(lowerInput)) {
    return "intensely curious and intrigued, with raised eyebrow and engaged, questioning expression";
  }

  // Default: high-energy positive emotion (best for general CTR)
  return "energetically engaged and charismatic, with compelling eye contact and magnetic presence";
}

// Backward compatibility alias
export const optimizeThumbnailPrompt = enhanceThumbnailPrompt;
