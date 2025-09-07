"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./navigasi.module.css";

export default function Navigasi() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // biar nggak error hydration
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <header className={styles.kepala}>
      <Link href="/">
        <div className={styles["logo-name"]}>
          <Image
            src="/globe.svg"
            alt="Logo"
            width={30}
            height={30}
            className={styles.rotate}
          />

          {/* <Image src="/globe.svg" alt="Logo" width={30} height={30} /> */}
          <h1>Testing</h1>
        </div>
      </Link>

      {/* Menu biasa (desktop) */}
      <nav className={styles.link}>
        <Link href="/galler">Gallery</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      {/* Tombol hamburger (mobile) */}
      <button
        className={styles.hamburger}
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        ☰
      </button>

      {/* Menu mobile dengan animasi */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
      {/* Tombol Dark Mode */}
      <button
        className={styles.toggle}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
    </header>
  );
}
