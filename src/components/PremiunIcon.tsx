import React from "react";

interface PremiumIconProps {
  className?: string;
}

export default function PremiumIcon({ className }: PremiumIconProps) {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
        <g transform="translate(50,50) scale(1.25)" fill="currentColor">
            <circle cx="0" cy="-30" r="6" />
            <circle cx="30" cy="0" r="6" />
            <circle cx="0" cy="30" r="6" />
            <circle cx="-30" cy="0" r="6" />
            <rect x="-2" y="-40" width="7" height="26" rx="1" transform="rotate(45)" />
            <rect x="-2" y="-40" width="7" height="26" rx="1" transform="rotate(135)" />
            <rect x="-2" y="-40" width="7" height="26" rx="1" transform="rotate(-135)" />
            <rect x="-2" y="-40" width="7" height="26" rx="1" transform="rotate(-45)" />
        </g>
        </svg>

    );
}