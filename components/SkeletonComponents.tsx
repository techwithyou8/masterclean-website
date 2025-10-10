export function ServicesSkeleton() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="h-8 bg-gray-200 rounded-md w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-md w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 sm:h-56 bg-gray-200 animate-pulse"></div>
              <div className="p-4 sm:p-6">
                <div className="h-6 bg-gray-200 rounded-md mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSkeleton() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="h-8 bg-gray-200 rounded-md w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-md w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid gap-6 lg:gap-8 max-w-6xl mx-auto lg:grid-cols-3">
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-md mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6">
              <div className="h-6 bg-gray-200 rounded-md w-48 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-md w-64 mb-6 animate-pulse"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
                <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutSkeleton() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="h-8 bg-gray-200 rounded-md w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-md w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
