import { Helmet } from "react-helmet-async";

export default function MonetagVerification() {
  return (
    <>
      <Helmet>
        <title>Monetag Verification - Ruvab IT</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-12 border border-slate-200 dark:border-slate-700">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
                Monetag Verification
              </h1>
              
              <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                Hello, Monetag!
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-lg">
                This is a temporary verification page for Monetag integration.
              </p>
              
              <div className="mt-8 text-sm text-slate-500 dark:text-slate-400">
                <p>Verification Page - To be removed after approval</p>
                <p>Ruvab IT - Advanced Technology Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}