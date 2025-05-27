"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("bluePulseUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-100 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to Blue Pulse!&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <Image src="/vercel.svg" alt="Vercel Logo" className="dark:invert" width={100} height={24} priority />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] dark:before:bg-gradient-radial dark:before:from-black dark:before:to-transparent dark:after:from-sky-800 dark:after:via-[#0141ff] dark:after:content-[''] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with&nbsp;Vercel.
          </p>
        </a>
      </div>

      {/* Hero Section */}
      <section className="py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Blue Pulse</h1>
        <p className="text-lg">
          Connecting people through shared experiences and building a stronger community. Join Blue Pulse in making a
          difference.
        </p>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-4">Blue Pulse all over the world</h2>
        <p className="text-lg">See where our members are making an impact globally.</p>
        {/* Placeholder for Map Component */}
        <div>[Map Component Here]</div>
      </section>

      {/* Community Posts Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-4">Community Posts</h2>
        {/* Example Community Post */}
        <div className="border p-4 rounded-md">
          <h3 className="text-xl font-semibold">Post Title</h3>
          <p className="text-gray-700">
            Content of the community post. This is a great example of how Blue Pulse members are connecting and sharing
            their experiences.
          </p>
        </div>
      </section>

      {/* Impact Journey Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-4">Our Impact Journey</h2>
        <p className="text-lg">Follow our journey and see the impact we're making together.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Join The Blue Pulse
        </button>
      </section>

      {/* User Stats Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-4">User Stats</h2>
        <p className="text-lg">Welcome, Blue Pulse member! Here are some of your stats:</p>
        {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg">
          Have questions or want to get involved? Contact us at{" "}
          <a href="mailto:contact@bluepulse.network">contact@bluepulse.network</a>.
        </p>
      </section>
    </main>
  )
}
