declare module 'http' {
  interface IncomingMessage {
    body: Record<string, string>
  }
  interface IncomingHttpHeaders {
    traceId: string
    apicode: string
  }
}
