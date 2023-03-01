import DashboardShell from "@/components/Dashboard/DashboardShell";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import React from "react";

const title = "How to use? - Get Feedback";
const url = "https://getfb.vercel.app/how";

const HowToUse = () => {
  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      <div className="w-full h-screen p-4">
        <DashboardShell>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 1000 }}
            className="flex-grow bg-white dark:bg-neutral-800 w-5/6 rounded-lg flex flex-col justify-center"
          >
            <div className="p-6 flex items-center justify-start gap-x-10">
              <h3 className="font-bold text-3xl dark:text-neutral-50 text-neutral-800">
                Docs <span>\</span>
              </h3>
              <p className="font-semibold text-lg">
                How to embed feedback component? 🤔
              </p>
            </div>
            <div className="flex-grow dark:bg-neutral-600 bg-sky-100 rounded-b-lg p-4">
              <h2 className="text-5xl font-bold w-full text-center">
                Use iframe tag
              </h2>
              <div className="mt-4 p-4">
                <h3 className="font-semibold text-xl mb-4">
                  What is iframe? 🖼️
                </h3>
                <p>
                  An iframe, short for inline frame, is an HTML element used to
                  embed another HTML document within the current HTML document.
                  Essentially, it allows you to display content from one website
                  within another website. The iframe tag is an empty tag and
                  requires a source attribute (src) to be set to the URL of the
                  page you want to embed. You can also set optional attributes
                  such as width and height to control the size of the iframe.
                  Iframes are commonly used for embedding videos, maps, social
                  media feeds, and other types of interactive content into web
                  pages. They can be a useful tool for incorporating content
                  from external sources without requiring the user to leave your
                  website.
                </p>
              </div>
              <div className="mt-4 dark:bg-neutral-800 bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-xl mb-4">Step-by-step 🪜</h3>
                <ol className="list-decimal list-outside px-4">
                  <li>
                    <p className="mb-4">
                      Add the iframe tag to your HTML file where you want the
                      embedded content to appear. The basic syntax for an iframe
                      tag is:
                    </p>
                    <code className="text-lg rounded-md px-4 py-2 dark:bg-neutral-700 bg-neutral-200">
                      {'<iframe src="URL"></iframe>'}
                    </code>
                    <p className="mt-4">
                      {`Replace URL with the web address of the feedback page you
                      want to embed (you can find "Copy Embed Link" button on
                      the your site's approved feedback page).`}
                    </p>
                  </li>
                  <li className="mt-4">
                    <p className="mb-4">
                      Customize the iframe by setting optional attributes such
                      as width and height. These attributes control the size of
                      the embedded content. For example:
                    </p>
                    <code className="text-lg rounded-md px-4 py-2 dark:bg-neutral-700 bg-neutral-200">
                      {'<iframe src="URL" width="500" height="400"></iframe>'}
                    </code>
                    <p className="mt-4">
                      {`This will embed the webpage at the specified URL with a width of 500 pixels and a height of 400 pixels.`}
                    </p>
                  </li>
                  <p className="font-semibold mt-4">
                    {
                      "That's it! With these simple steps, you can use the iframe tag to embed content from other web pages into your own web page."
                    }
                  </p>
                </ol>
              </div>
              <h2 className="text-5xl font-bold w-full text-center mt-4">
                Use iframe-resizer package
              </h2>
              <div className="mt-4 p-4">
                <h3 className="font-semibold text-xl mb-4">
                  What is{" "}
                  <a
                    className="dark:text-blue-300 text-green-500 underline"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.npmjs.com/package/iframe-resizer?activeTab=readme"
                  >
                    iframe-resizer
                  </a>
                  ? 🤖
                </h3>
                <p>
                  {`Iframe-resizer is a JavaScript library that allows you to
                  automatically resize an iframe to fit its content. When you
                  embed content from another website using an iframe, the size
                  of the content may change dynamically based on user
                  interactions or changes to the content itself. Iframe-resizer
                  monitors the content within the iframe and adjusts the
                  iframe's size accordingly, so that the content is always
                  displayed in its entirety without scrollbars. `}
                  <strong>Can be used with Libraries and Frameworks!</strong>
                </p>
              </div>
              <div className="mt-4 dark:bg-neutral-800 bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-xl mb-4">Step-by-step 🪜</h3>
                <ol className="list-decimal list-outside px-4">
                  <li>
                    <p className="mb-4">
                      Get the latest version of iframe-resizer:{" "}
                      <a
                        className="dark:text-blue-300 text-green-500 underline"
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.npmjs.com/package/iframe-resizer?activeTab=readme"
                      >
                        https://www.npmjs.com/package/iframe-resizer
                      </a>
                    </p>
                  </li>
                  <li className="mt-4">
                    <p>Follow the steps provided in iframe-resizer docs.</p>
                  </li>
                </ol>
              </div>
            </div>
          </motion.div>
        </DashboardShell>
      </div>
    </>
  );
};

export default HowToUse;
