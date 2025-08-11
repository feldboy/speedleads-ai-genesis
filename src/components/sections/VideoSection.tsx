
import React from "react";

const VideoSection = () => (
  <section className="py-12 bg-gradient-to-b from-white to-gray-50">
    <div className="container mx-auto">
      <div className="rounded-2xl overflow-hidden shadow-lg border border-tech-blue/10">
        <video
          src="/lovable-uploads/2K.webm"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className="w-full aspect-video object-cover"
          poster="/speedleads-logo.png"
        >
          הדפדפן שלך אינו תומך בסרטונים.
        </video>
      </div>
    </div>
  </section>
);

export default VideoSection;
