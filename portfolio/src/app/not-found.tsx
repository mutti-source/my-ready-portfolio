"use client";

import Link from "next/link";
import { Container } from "react-bootstrap";
import { FaCube, FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <main
      className="d-flex align-items-center justify-content-center min-vh-100 text-center p-4"
      style={{ backgroundColor: "#090e17", color: "#e2e8f0" }}
    >
      <Container>
        <div className="card-glass-3d p-4 p-md-5 mx-auto" style={{ maxWidth: "560px" }}>
          <div className="mb-3 d-inline-flex p-3 rounded-circle bg-dark border border-info border-opacity-30">
            <FaCube className="text-info display-4" />
          </div>
          <h1 className="display-4 fw-bold gradient-text-cyber mb-2">404</h1>
          <h2 className="fs-4 fw-semibold text-light mb-3">3D Coordinate Not Found</h2>
          <p className="text-muted mb-4 small">
            The page or article you are searching for has moved or does not exist in this sector.
          </p>
          <Link href="/" className="btn btn-primary-custom d-inline-flex align-items-center gap-2">
            <FaHome /> Return to Home
          </Link>
        </div>
      </Container>
    </main>
  );
}
