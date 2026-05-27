import React from "react";

const VideoSection = () => (
  <section className="py-16 lg:py-24 bg-white">
    <div className="container mx-auto">
      <div className="asym-grid items-end mb-10">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-index text-tech-blue">02 / 04</span>
            <span className="h-px w-12 bg-tech-blue/40" />
            <span className="eyebrow text-gray-500">Showreel</span>
          </div>
          <h2 className="heading-he display-md text-dark">
            הטכנולוגיה <span className="gradient-text">בפעולה</span>
          </h2>
        </div>
        <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-md lg:justify-self-end">
          הצצה למה שאנחנו בונים — ממשקים מהירים, אנימציות חלקות וחווית משתמש שמשקפת איכות.
        </p>
      </div>
      <div className="relative overflow-hidden border border-gray-200" style={{ borderRadius: '4px' }}>
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
