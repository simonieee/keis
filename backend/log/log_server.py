import socketio

sio = socketio.Server(cors_allowed_origins='*')

app = socketio.WSGIApp(sio)

class CustomNamespace(socketio.Namespace):
    def on_connect(self, sid, environ):
        print("Client connected", sid)

    def on_disconnect(self, sid):
        print("Client disconnected", sid)

    def on_log_message(self, sid, data):
        print("Log received:", data, sid)
        self.emit('log', data, room=sid)  # 클라이언트에게 로그 이벤트 전송

sio.register_namespace(CustomNamespace('/'))

if __name__ == '__main__':
    import eventlet
    eventlet.wsgi.server(eventlet.listen(('', 9999)), app)