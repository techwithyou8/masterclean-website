import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Michael Dizdarevic",
      role: "Eigenaar & Operationeel Manager",
      experience: "10 jaar ervaring",
      // Behoud originele foto
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    },
    {
      name: "Jan Pietersen",
      role: "Teamleider Kantoorschoonmaak",
      experience: "8 jaar ervaring",
      // Nieuwe foto voor Jan
      image:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    },
    {
      name: "Sophie de Vries",
      role: "Specialist Vakantiehuizen",
      experience: "6 jaar ervaring",
      // Behoud originele foto
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ons Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Maak kennis met de professionals die ervoor zorgen dat uw ruimtes altijd perfect schoon zijn
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-100"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.experience}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
