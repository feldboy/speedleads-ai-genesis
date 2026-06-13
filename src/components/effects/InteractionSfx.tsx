import { useInteractionSfx } from '@/hooks/useInteractionSfx';

/**
 * Headless mount point for the generative interaction SFX layer.
 * Renders nothing; just runs the hook for the lifetime of the page.
 */
const InteractionSfx = () => {
  useInteractionSfx();
  return null;
};

export default InteractionSfx;
