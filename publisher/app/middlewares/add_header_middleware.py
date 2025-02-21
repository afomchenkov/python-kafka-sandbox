import time
import json
import uuid

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


class AddHeaderMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())
        response = await call_next(request)

        # if response.headers.get("content-type") == "application/json":
        #     response_body = [chunk async for chunk in response.body_iterator]
        #     response_text = b"".join(response_body).decode("utf-8")
        #     try:
        #         response_json = json.loads(response_text)
        #         response_json["requestId"] = request_id
        #         new_response = Response(
        #             content=json.dumps(response_json),
        #             media_type="application/json",
        #             status_code=response.status_code,
        #             headers=dict(response.headers)
        #         )
        #         return new_response
        #     except json.JSONDecodeError:
        #         pass

        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        response.headers["X-Process-Time"] = str(process_time)
        response.headers["X-Request-Id"] = request_id

        return response
