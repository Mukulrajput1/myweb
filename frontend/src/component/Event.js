import React from 'react';
import { Helmet } from 'react-helmet-async';

const EventPage = ({ searchParams = {} }) => {
  const {
    title = "The Baby Show Jul 29 2024",
    description = "Lean boil pivot future-proof but engagement users giant ballpark new...",
    imageUrl = "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg",
  } = searchParams;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="baby show, events, 2024" />
        <meta name="author" content="Event Organizer" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://mukultech.online/event" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content={title} />

        {/* Uncomment if Twitter meta tags are needed */}
        {/* 
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        */}
      </Helmet>
      <div>
        abc
      </div>
    </div>
  );
};

export default EventPage;
