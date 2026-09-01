"use client";
import React, { useEffect, useState } from "react";
import styles from "./BlogContent.module.css";

interface BlogContentProps {
    slug: string;
    initialContent?: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ slug, initialContent = "" }) => {
    const [content, setContent] = useState<string>(initialContent);
    const [loading, setLoading] = useState<boolean>(!initialContent);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialContent) {
            setContent(initialContent);
            setLoading(false);
            return;
        }

        const loadContent = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/data/blogs/${slug}.html`);

                if (!response.ok) {
                    throw new Error("Failed to load blog content");
                }

                const html = await response.text();
                setContent(html);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
                setContent("");
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [slug, initialContent]);

    if (loading) {
        return (
            <div className={styles.blogContent}>
                <div className={styles.loading}>Loading article...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.blogContent}>
                <div className={styles.error}>Error loading article: {error}</div>
            </div>
        );
    }

    return (
        <div
            className={styles.blogContent}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default BlogContent;

