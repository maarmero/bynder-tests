""""
File containing custom assertion methods.
Every assertion should take a HTTP response as input parameter.
"""

from requests import Response


def trace_id_mention(http_response: Response):
    trace_id = http_response.request.headers
    return f" (trace_id={trace_id})" if trace_id else ""


def assert_status_in(http_response: Response,status_from,status_to):
    method = http_response.request.method
    url = http_response.request.url
    status = http_response.status_code
    message = (
        f"Expected {method} {url}{trace_id_mention(http_response)} to have a status code of range "
        f"[{status_from}, {status_to}] but was {status}"
    )
    if not status_from <= http_response.status_code <= status_to:
        message += " The response was: \r\n" + str(http_response.content)
    assert status_from <= http_response.status_code <= status_to,message


def assert_2xx(http_response: Response):
    assert_status_in(http_response,200,299)
