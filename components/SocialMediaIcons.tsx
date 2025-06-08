import React from "react"
import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react"

interface SocialMediaIconsProps {
  variant?: "header" | "footer"
  className?: string
}

export default function SocialMediaIcons({ variant = "footer", className = "" }: SocialMediaIconsProps) {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61576932431259",
      icon: Facebook,
      color: "hover:text-blue-600"
    },
    {
      name: "LinkedIn", 
      url: "https://www.linkedin.com/company/masterclean-service",
      icon: Linkedin,
      color: "hover:text-blue-500"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/mastercleanNL",
      icon: Twitter,
      color: "hover:text-blue-400"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/masterclean_service",
      icon: Instagram,
      color: "hover:text-pink-500"
    }
  ]

  const baseStyles = variant === "header" 
    ? "w-5 h-5 text-gray-600 hover:scale-110 transition-all duration-200" 
    : "w-5 h-5 text-gray-400 hover:scale-110 transition-all duration-200"

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {socialLinks.map((social) => {
        const IconComponent = social.icon
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseStyles} ${social.color}`}
            aria-label={`Volg ons op ${social.name}`}
            title={`Volg ons op ${social.name}`}
          >
            <IconComponent />
          </a>
        )
      })}
    </div>
  )
}
