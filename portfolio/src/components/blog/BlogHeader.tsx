"use client";

import React from "react";
import styles from "./BlogHeader.module.css";
import { BlogPost } from "@/src/data/blogs";

interface BlogHeaderProps {
  blog: BlogPost;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ blog }) => {
  return (
    <header className={styles.blogHeader}>
      <div className={styles.headerContent}>
        <div className={styles.blogMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>📅</span>
            <time dateTime={blog.date}>
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>⏱️</span>
            <span>{blog.readTime} min read</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>✍️</span>
            <span>{blog.author}</span>
          </div>
        </div>
        <h1 className={styles.blogTitle}>{blog.title}</h1>
        <p className={styles.blogDescription}>{blog.description}</p>
      </div>
    </header>
  );
};

export default BlogHeader;
