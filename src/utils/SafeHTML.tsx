import DOMPurify from 'dompurify';

type SafeHTMLProps = {
    html?: string;
    className?: string;
};

export default function SafeHTML({ html, className}: SafeHTMLProps) {
    const cleanHTML = DOMPurify.sanitize(html ?? '');

    return (
        <div 
            className={className}
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />

    );
}