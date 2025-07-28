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
      color: "text-[#1877F2] hover:text-[#1877F2]", // Facebook original blue
      hoverColor: "hover:bg-blue-50"
    },
    {
      name: "LinkedIn", 
      url: "https://www.linkedin.com/company/masterclean-service",
      icon: Linkedin,
      color: "text-[#0A66C2] hover:text-[#0A66C2]", // LinkedIn original blue
      hoverColor: "hover:bg-blue-50"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/mastercleanNL",
      icon: Twitter,
      color: "text-[#1DA1F2] hover:text-[#1DA1F2]", // Twitter original blue
      hoverColor: "hover:bg-blue-50"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/masterclean_service",
      icon: Instagram,
      color: "text-[#E4405F] hover:text-[#E4405F]", // Instagram original pink
      hoverColor: "hover:bg-pink-50"
    }
  ]

  const baseStyles = variant === "header" 
    ? "w-5 h-5 hover:scale-110 transition-all duration-200 p-1 rounded" 
    : "w-5 h-5 hover:scale-110 transition-all duration-200 p-1 rounded"

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {socialLinks.map((social) => {
        const IconComponent = social.icon
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseStyles} ${social.color} ${social.hoverColor}`}
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
