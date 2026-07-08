{/*}
function Card({ title, value }) {

  const reviewCard = [
    "Avg Bugs Found",
    "Avg Security Issues",
    "Avg Optimizations"
  ].includes(title);

  return (
    <div
      className={`backdrop-blur-md rounded-3xl shadow-xl p-6 hover:scale-105 transition duration-300
      ${
        reviewCard
          ? "bg-red-950/20 border border-red-500"
          : "bg-black/20 border border-yellow-600"
      }`}
    >

      <p
        className={`text-lg font-semibold ${
          reviewCard ? "text-red-300" : "text-yellow-300"
        }`}
      >
        {title}
      </p>

      <h2 className="text-4xl font-bold text-white mt-4">
        {value}
      </h2>

    </div>
  );
}

function AnalyticsCards({ analytics }) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <Card
        title="Total Requests"
        value={analytics.total_requests}
      />

      <Card
        title="Code Generation"
        value={analytics.code_generation}
      />

      <Card
        title="Code Reviews"
        value={analytics.code_review}
      />

      <Card
        title="Avg Response"
        value={analytics.average_response_time + " sec"}
      />

      <Card
        title="Compilation"
        value={analytics.compilation_rate + "%"}
      />

      <Card
        title="Execution"
        value={analytics.execution_rate + "%"}
      />

      <Card
        title="Cache Hit"
        value={analytics.cache_hit_rate + "%"}
      />

      <Card
        title="Most Used"
        value={analytics.most_used_language}
      />

      <Card
        title="Avg Bugs Found"
        value={analytics.average_bugs}
    />

    <Card
        title="Avg Security Issues"
        value={analytics.average_security}
    />

    <Card
        title="Avg Optimizations"
        value={analytics.average_optimization}
    />

    </div>

  );
}

export default AnalyticsCards;
*/}
function Card({ title, value }) {
  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-2xl
      bg-black/10
      backdrop-blur-md
      border border-yellow-700/60
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-yellow-400
      hover:shadow-xl
      hover:shadow-yellow-900/30"
    >
      {/* Background Glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-yellow-400/10 blur-3xl"></div>

      <p className="text-sm uppercase tracking-widest text-yellow-300 font-semibold">
        {title}
      </p>

      <h2 className="mt-5 text-4xl font-extrabold text-white">
        {value}
      </h2>
    </div>
  );
}

function AnalyticsCards({ analytics }) {
  return (
    <div className="space-y-12">

      {/* ====================== CODE GENERATION ====================== */}

      <section
        className="
        bg-black/20
        backdrop-blur-md
        border border-yellow-700/70
        rounded-3xl
        p-8
        shadow-2xl"
      >

        <div className="flex items-center justify-between mb-8">
            <span className="px-4 py-2 rounded-full bg-green-900/40 border border-green-600 text-green-300 text-sm">
                Live Metrics
            </span>

          <div>

            <h2 className="text-3xl font-bold text-yellow-200">
              ⚡ Code Generation Analytics
            </h2>

            <p className="text-yellow-100/60 mt-2">
              Performance metrics generated while solving coding problems.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Card
            title="Total Requests"
            value={analytics.total_requests}
          />

          <Card
            title="Code Generation"
            value={analytics.code_generation}
          />

          <Card
            title="Avg Response"
            value={`${analytics.average_response_time} sec`}
          />

          <Card
            title="Compilation"
            value={`${analytics.compilation_rate}%`}
          />

          <Card
            title="Execution"
            value={`${analytics.execution_rate}%`}
          />

          <Card
            title="Cache Hit"
            value={`${analytics.cache_hit_rate}%`}
          />

          <Card
            title="Most Used"
            value={analytics.most_used_language}
          />

          <Card
            title="Avg Lines"
            value={analytics.average_lines}
          />

        </div>

      </section>

      {/* ====================== CODE REVIEW ====================== */}

      <section
        className="
        bg-black/20
        backdrop-blur-md
        border border-yellow-700/70
        rounded-3xl
        p-8
        shadow-2xl"
      >

        <div className="flex items-center justify-between mb-8">
            <span className="px-4 py-2 rounded-full bg-yellow-900/40 border border-yellow-600 text-yellow-300 text-sm">
                AI Quality Report
            </span>

          <div>

            <h2 className="text-3xl font-bold text-yellow-200">
              🔍 Code Review Analytics
            </h2>

            <p className="text-yellow-100/60 mt-2">
              AI review quality, bug detection and optimization insights.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Card
            title="Code Reviews"
            value={analytics.code_review}
          />

          <Card
            title="Avg Bugs Found"
            value={analytics.average_bugs}
          />

          <Card
            title="Avg Security Issues"
            value={analytics.average_security}
          />

          <Card
            title="Avg Optimizations"
            value={analytics.average_optimization}
          />

        </div>

      </section>

    </div>
  );
}

export default AnalyticsCards;