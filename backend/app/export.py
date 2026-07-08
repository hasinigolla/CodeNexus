import pandas as pd
from fastapi.responses import FileResponse

from app.database import analytics_collection


def export_csv():

    docs = list(
        analytics_collection.find(
            {},
            {"_id": 0}
        )
    )

    df = pd.DataFrame(docs)

    path = "analytics.csv"

    df.to_csv(path, index=False)

    return FileResponse(
        path,
        media_type="text/csv",
        filename="analytics.csv"
    )