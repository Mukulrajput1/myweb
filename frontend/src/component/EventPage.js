import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const EventPage = () => {
    const [searchParams] = useSearchParams();

    // Extract query parameters with default values
    const title = searchParams.get('title') || "The Baby Show Jul 29 2024";
    const description = searchParams.get('description') || "Lean boil pivot future-proof but engagement users giant ballpark new...";
    const imageUrl = searchParams.get('imageUrl') || "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg";

    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image:alt" content={title} />
            </Helmet>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <img src={imageUrl} alt={title} style={{ maxWidth: '100%' }} />
            </div>
        </div>
    );
};

export default EventPage;
