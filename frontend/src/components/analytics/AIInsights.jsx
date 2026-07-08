{/*

function AIInsights({ analytics }) {

    const insights = [];

    // Most Used Language
    insights.push(
        `Most used programming language is ${analytics.most_used_language}.`
    );

    // Compilation
    if (analytics.compilation_rate >= 80) {
        insights.push("Compilation success rate is excellent.");
    }
    else if (analytics.compilation_rate >= 60) {
        insights.push("Compilation success rate is good.");
    }
    else {
        insights.push("Compilation success rate needs improvement.");
    }

    // Execution
    if (analytics.execution_rate >= 80) {
        insights.push("Execution success rate is excellent.");
    }
    else if (analytics.execution_rate >= 60) {
        insights.push("Execution success rate is good.");
    }
    else {
        insights.push("Execution success rate is low.");
    }

    // Cache
    if (analytics.cache_hit_rate >= 50) {
        insights.push("Cache utilization is effective.");
    }
    else {
        insights.push("Increase cache utilization to reduce response time.");
    }

    // Response Time
    if (analytics.average_response_time <= 3) {
        insights.push("Average response time is excellent.");
    }
    else if (analytics.average_response_time <= 6) {
        insights.push("Average response time is acceptable.");
    }
    else {
        insights.push("Average response time is high. Optimization is recommended.");
    }

    return (

        <div className="bg-black/20 backdrop-blur-md border border-yellow-600 rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold text-yellow-300 mb-6">

                🤖 AI Insights

            </h2>

            <div className="space-y-4">

                {insights.map((item, index) => (

                    <div
                        key={index}
                        className="bg-black/30 rounded-xl p-4 border border-green-700"
                    >

                        <p className="text-lg text-white">

                            ✅ {item}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default AIInsights;
*/}

function AIInsights({ analytics }) {

    const insights = [];

    // Most Used Language
    insights.push(
        `Most used programming language is ${analytics.most_used_language}.`
    );

    // Compilation
    if (analytics.compilation_rate >= 80) {
        insights.push("Compilation success rate is excellent.");
    }
    else if (analytics.compilation_rate >= 60) {
        insights.push("Compilation success rate is good.");
    }
    else {
        insights.push("Compilation success rate needs improvement.");
    }

    // Execution
    if (analytics.execution_rate >= 80) {
        insights.push("Execution success rate is excellent.");
    }
    else if (analytics.execution_rate >= 60) {
        insights.push("Execution success rate is good.");
    }
    else {
        insights.push("Execution success rate is low.");
    }

    // Cache
    if (analytics.cache_hit_rate >= 50) {
        insights.push("Cache utilization is effective.");
    }
    else {
        insights.push("Increase cache utilization to reduce response time.");
    }

    // Response Time
    if (analytics.average_response_time <= 3) {
        insights.push("Average response time is excellent.");
    }
    else if (analytics.average_response_time <= 6) {
        insights.push("Average response time is acceptable.");
    }
    else {
        insights.push("Average response time is high. Optimization is recommended.");
    }

    return (

        <div className="
            bg-black/20
            backdrop-blur-md
            border
            border-yellow-700
            rounded-3xl
            shadow-2xl
            p-8
        ">

            <div className="flex items-center gap-3 mb-8">

                <div className="text-4xl">
                    🤖
                </div>

                <div>

                    <h2 className="text-3xl font-bold text-yellow-200">
                        AI Insights
                    </h2>

                    <p className="text-yellow-100/60 mt-1">
                        Smart recommendations generated from your analytics
                    </p>

                </div>

            </div>

            <div className="space-y-5">

                {insights.map((item, index) => (

                    <div
                        key={index}
                        className="
                        bg-green-900/30
                        border
                        border-yellow-700
                        rounded-2xl
                        p-5
                        hover:border-yellow-400
                        hover:scale-[1.02]
                        transition-all
                        duration-300
                        "
                    >

                        <div className="flex items-start gap-4">

                            <div className="text-2xl">
                                💡
                            </div>

                            <p className="text-yellow-50 leading-7 text-lg">
                                {item}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default AIInsights;