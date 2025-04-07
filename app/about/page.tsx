"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WaveBackground from "@/components/wave-background"
import { Button } from "@/components/ui/button"
import { Lock, DollarSign, Globe, Leaf, Droplets, Shield, Landmark, FileCheck } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<string>("nature")

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Simple fade animation for tab content
  const tabContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-950">
      <WaveBackground />

      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Section 1: What is the Blue Hearts Foundation? */}
          <motion.section
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-100 mb-6">What is The BlueHearts Network?</h1>
            <p className="text-xl text-blue-300 mb-8 max-w-3xl mx-auto">
              The BlueHearts Network provides digital infrastructure to support impact-driven maritime projects, known
              as Blue Hearts Projects. These projects operate independently but rely on the foundation's trust layer and
              funding tools to enhance their credibility, funding access, and transparency.
            </p>

            {/* Network visualization */}
            <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 mt-10 mb-6 max-w-2xl mx-auto">
              <p className="text-blue-300 text-center">
                A decentralized network of independent ocean impact projects working together to restore and protect our
                oceans.
              </p>
            </div>
          </motion.section>

          {/* Section 2: What Does the Network Provide? */}
          <motion.section
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-blue-100 mb-8 text-center">
              What Does the Network Provide?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Trust & Transparency */}
              <motion.div
                variants={itemVariants}
                className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 h-full"
              >
                <div className="bg-blue-800/50 p-4 rounded-full inline-flex mb-4">
                  <Lock className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-100 mb-3">Trust & Transparency</h3>
                <p className="text-blue-300">
                  Projects gain verifiable credentials to build confidence with investors, communities, and
                  institutions.
                </p>
              </motion.div>

              {/* Funding Infrastructure */}
              <motion.div
                variants={itemVariants}
                className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 h-full"
              >
                <div className="bg-blue-800/50 p-4 rounded-full inline-flex mb-4">
                  <DollarSign className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-100 mb-3">Funding Infrastructure</h3>
                <p className="text-blue-300 mb-4">Access wallets and funding tools that support:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FileCheck className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-200 text-sm">Crowdfunding & personal donations</span>
                  </li>
                  <li className="flex items-start">
                    <FileCheck className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-200 text-sm">Corporate Social Responsibility (CSR) contributions</span>
                  </li>
                  <li className="flex items-start">
                    <FileCheck className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-200 text-sm">ESG funding from companies</span>
                  </li>
                  <li className="flex items-start">
                    <FileCheck className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-200 text-sm">Large-scale institutional investments</span>
                  </li>
                </ul>
              </motion.div>

              {/* Project Visibility */}
              <motion.div
                variants={itemVariants}
                className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 h-full"
              >
                <div className="bg-blue-800/50 p-4 rounded-full inline-flex mb-4">
                  <Globe className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-100 mb-3">Project Visibility</h3>
                <p className="text-blue-300">
                  All projects are featured through a shared network and platform, helping them gain reach, support, and
                  legitimacy.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* Section 3: Blue Hearts Project Focus */}
          <motion.section
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-blue-100 mb-8 text-center">
              Blue Hearts Project Focus
            </motion.h2>

            {/* Custom Tab Implementation */}
            <div className="w-full">
              {/* Tab Navigation */}
              <div className="flex justify-center mb-6">
                <div className="bg-blue-900/40 border border-blue-800/50 rounded-md p-1 flex">
                  <button
                    onClick={() => setActiveTab("nature")}
                    className={`flex items-center px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                      activeTab === "nature"
                        ? "bg-blue-700 text-white"
                        : "text-blue-300 hover:text-white hover:bg-blue-800/50"
                    }`}
                  >
                    <Leaf className="h-4 w-4 mr-2" />
                    Nature-Based Solutions
                  </button>
                  <button
                    onClick={() => setActiveTab("protection")}
                    className={`flex items-center px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                      activeTab === "protection"
                        ? "bg-blue-700 text-white"
                        : "text-blue-300 hover:text-white hover:bg-blue-800/50"
                    }`}
                  >
                    <Droplets className="h-4 w-4 mr-2" />
                    Environmental Protection
                  </button>
                </div>
              </div>

              {/* Tab Content with AnimatePresence for smooth transitions */}
              <AnimatePresence mode="wait">
                {activeTab === "nature" && (
                  <motion.div
                    key="nature-tab"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={tabContentVariants}
                    className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-emerald-800/50 p-3 rounded-full mr-4">
                        <Leaf className="h-6 w-6 text-emerald-300" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-100">Nature-Based Solutions</h3>
                    </div>

                    <p className="text-blue-300 mb-6">
                      We support projects that harness natural ecosystems to address environmental challenges, focusing
                      on marine and coastal habitats that provide critical ecosystem services.
                    </p>

                    <div className="space-y-4 mt-6">
                      <div className="bg-blue-800/30 rounded-lg p-4">
                        <h4 className="font-medium text-blue-100 mb-2 flex items-center">
                          <Leaf className="h-4 w-4 mr-2 text-emerald-300" />
                          Seaweed farms that restore ocean balance
                        </h4>
                        <p className="text-sm text-blue-300">
                          Supporting the development and expansion of seaweed farming initiatives that help restore
                          marine ecosystems while providing sustainable resources.
                        </p>
                      </div>
                      <div className="bg-blue-800/30 rounded-lg p-4">
                        <h4 className="font-medium text-blue-100 mb-2 flex items-center">
                          <Leaf className="h-4 w-4 mr-2 text-emerald-300" />
                          Marine-based bioplastics & biofilters
                        </h4>
                        <p className="text-sm text-blue-300">
                          Developing innovative materials and filtration systems derived from marine organisms to
                          address pollution and provide sustainable alternatives.
                        </p>
                      </div>
                      <div className="bg-blue-800/30 rounded-lg p-4">
                        <h4 className="font-medium text-blue-100 mb-2 flex items-center">
                          <Leaf className="h-4 w-4 mr-2 text-emerald-300" />
                          Blue carbon initiatives to capture oceanic CO₂
                        </h4>
                        <p className="text-sm text-blue-300">
                          Implementing projects that enhance the ocean's natural ability to sequester carbon through
                          marine vegetation and ecosystem management.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "protection" && (
                  <motion.div
                    key="protection-tab"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={tabContentVariants}
                    className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-700/50 p-3 rounded-full mr-4">
                        <Droplets className="h-6 w-6 text-blue-300" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-100">Environmental Protection & Restoration</h3>
                    </div>

                    <p className="text-blue-300 mb-6">
                      We support initiatives that actively protect marine environments from threats and restore damaged
                      ecosystems through direct intervention and innovative technologies.
                    </p>

                    <div className="space-y-4 mt-6">
                      <div className="bg-blue-800/30 rounded-lg p-4">
                        <h4 className="font-medium text-blue-100 mb-2 flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-blue-300" />
                          Mapping ecosystems to track damage and biodiversity loss
                        </h4>
                        <p className="text-sm text-blue-300">
                          Comprehensive monitoring and mapping initiatives that document the state of marine ecosystems,
                          identifying areas of concern and tracking changes over time.
                        </p>
                      </div>

                      <div className="bg-blue-800/30 rounded-lg p-4">
                        <h4 className="font-medium text-blue-100 mb-2">Restoration missions including:</h4>
                        <ul className="space-y-3 text-sm text-blue-300">
                          <li className="flex items-start">
                            <Droplets className="h-4 w-4 mr-2 text-blue-300 mt-0.5 flex-shrink-0" />
                            <span>Beach cleanups & plastic removal</span>
                          </li>
                          <li className="flex items-start">
                            <Droplets className="h-4 w-4 mr-2 text-blue-300 mt-0.5 flex-shrink-0" />
                            <span>Coral reef and seaweed reforestation</span>
                          </li>
                          <li className="flex items-start">
                            <Droplets className="h-4 w-4 mr-2 text-blue-300 mt-0.5 flex-shrink-0" />
                            <span>Ocean floor and coastal ecosystem repair</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Section 4: One Shared Mission */}
          <motion.section
            className="mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-blue-100 mb-8 text-center">
              One Shared Mission
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-blue-900/40 via-blue-800/60 to-blue-900/40 backdrop-blur-sm rounded-xl p-8 border border-blue-700/30 shadow-lg relative overflow-hidden"
            >
              {/* Animated wave background */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`wave-${i}`}
                    className="absolute h-16 w-[200%] left-0 right-0 bg-blue-500/10"
                    style={{
                      bottom: `${i * 20}%`,
                      borderRadius: "50%",
                      height: "60%",
                    }}
                    animate={{
                      x: ["-25%", "0%", "-25%"],
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <p className="text-lg text-blue-300 mb-4">
                  🧭 Every project, whether grassroots or global, shares the same mission:
                </p>
                <p className="text-2xl md:text-3xl font-light text-blue-100 italic font-serif">
                  "Restoring and protecting coastal and ocean ecosystems."
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* Section 5: The Bigger Vision */}
          <motion.section
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-blue-100 mb-8 text-center">
              The Bigger Vision: A Decentralized Ocean Impact Network
            </motion.h2>

            <motion.p variants={itemVariants} className="text-xl text-blue-300 mb-10 text-center max-w-3xl mx-auto">
              The Blue Hearts Foundation acts as a neutral enabler—it does not own the projects, but empowers them to
              succeed.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                variants={itemVariants}
                className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 flex flex-col items-center text-center"
              >
                <div className="bg-blue-800/50 p-4 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-100 mb-3">Trusted Digital Identity</h3>
                <p className="text-blue-300">
                  A system of verifiable credentials that builds trust and credibility for projects across the network.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 flex flex-col items-center text-center"
              >
                <div className="bg-blue-800/50 p-4 rounded-full mb-4">
                  <Landmark className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-100 mb-3">Flexible Financial Tools</h3>
                <p className="text-blue-300">
                  Transparent funding mechanisms that connect projects with resources efficiently and securely.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 flex flex-col items-center text-center"
              >
                <div className="bg-blue-800/50 p-4 rounded-full mb-4">
                  <FileCheck className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-100 mb-3">Verifiable System</h3>
                <p className="text-blue-300">
                  Tools for tracking impact and ensuring accountability across all projects in the network.
                </p>
              </motion.div>
            </div>
          </motion.section>

          <motion.p variants={itemVariants} className="text-blue-300 text-center mt-8 max-w-3xl mx-auto">
            Through this decentralized network model, we ensure that marine impact projects of all sizes can thrive,
            attract funding, and deliver measurable change.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-12 bg-blue-900/30 rounded-xl p-6 border border-blue-800/50 max-w-3xl mx-auto"
          >
            <h3 className="text-xl font-bold text-blue-100 mb-4 text-center">Our Network Ecosystem</h3>
            <div className="bg-blue-800/30 rounded-lg p-6">
              <p className="text-blue-200 text-center mb-4">
                The BlueHearts Network connects diverse ocean conservation projects around the world, providing
                structure and support like a coral reef ecosystem.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-blue-800/40 p-4 rounded-lg flex flex-col items-center text-center">
                  <Droplets className="h-8 w-8 text-emerald-300 mb-2" />
                  <span className="text-blue-100 font-medium">Restoration</span>
                </div>
                <div className="bg-blue-800/40 p-4 rounded-lg flex flex-col items-center text-center">
                  <Globe className="h-8 w-8 text-blue-300 mb-2" />
                  <span className="text-blue-100 font-medium">Mapping</span>
                </div>
                <div className="bg-blue-800/40 p-4 rounded-lg flex flex-col items-center text-center">
                  <Leaf className="h-8 w-8 text-green-300 mb-2" />
                  <span className="text-blue-100 font-medium">Seaweed</span>
                </div>
                <div className="bg-blue-800/40 p-4 rounded-lg flex flex-col items-center text-center">
                  <Shield className="h-8 w-8 text-amber-300 mb-2" />
                  <span className="text-blue-100 font-medium">Protection</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-blue-300 text-center italic mt-4">
              Like a coral reef ecosystem, our network provides structure and support for diverse marine projects to
              flourish.
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.section
            className="text-center sticky bottom-0 left-0 right-0 z-20 mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-900/80 via-blue-800/90 to-blue-900/80 backdrop-blur-lg border-t border-blue-700/50 py-4 px-6 shadow-lg">
              <h2 className="text-xl font-bold text-blue-100 mb-4">🌊 Ready to Dive Deeper?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-500" asChild>
                  <Link href="/projects">🔗 Explore Our Projects</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-700 text-blue-300 hover:bg-blue-800 hover:text-blue-100"
                  asChild
                >
                  <Link href="/documents/foundation-overview.pdf" target="_blank">
                    ⬇️ Download Foundation Overview PDF
                  </Link>
                </Button>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  )
}

