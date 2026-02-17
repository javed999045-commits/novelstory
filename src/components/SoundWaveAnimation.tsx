export function SoundWaveAnimation() {
  return (
    <div className="flex items-center justify-center gap-1 h-10 w-20">
      <div className="w-1 bg-accent animate-wave rounded-full [animation-delay:-0.4s]" />
      <div className="w-1 bg-accent animate-wave rounded-full [animation-delay:-0.2s]" />
      <div className="w-1 bg-accent animate-wave rounded-full" />
      <div className="w-1 bg-accent animate-wave rounded-full [animation-delay:0.2s]" />
      <div className="w-1 bg-accent animate-wave rounded-full [animation-delay:0.4s]" />
    </div>
  );
}
