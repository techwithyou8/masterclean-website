import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Users, Award } from "lucide-react"
import Image from "next/image"

interface AboutProps {
  translations: any
}

export default function About({ translations }: AboutProps) {
  const features = [
    {
      icon: Shield,
      title: translations.about.features.insured.title,
      description: translations.about.features.insured.description,
    },
    {
      icon: Clock,
      title: translations.about.features.flexible.title,
      description: translations.about.features.flexible.description,
    },
    {
      icon: Users,
      title: translations.about.features.experienced.title,
      description: translations.about.features.experienced.description,
    },
    {
      icon: Award,
      title: translations.about.features.quality.title,
      description: translations.about.features.quality.description,
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">{translations.about.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{translations.about.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/professional-cleaning-team.png"
                alt="MasterClean team"
                width={500}
                height={600}
                className="w-full h-auto"
              />
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10+</div>
                <div className="text-sm text-gray-600">{translations.about.experience}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
