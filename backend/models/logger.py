import logging
import logging.handlers
import socket

class UTF8SocketHandler(logging.handlers.SocketHandler):
    def __init__(self, host, port):
        super().__init__(host, port)

    def emit(self, record):
        try:
            # 메시지를 UTF-8로 인코딩합니다.
            msg = self.format(record)
            msg = msg.encode('utf-8')
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.connect((self.host, self.port))
            sock.sendall(msg)
            sock.close()
        except Exception:
            self.handleError(record)

def create_logger(logger_name , host, port):
    logger = logging.getLogger(logger_name)
    if len(logger.handlers) > 0:  # 로거가 이미 존재하는 경우
        return logger

    logger.setLevel(logging.DEBUG)
    log_format = logging.Formatter('[%(levelname)s|%(name)s|%(filename)s:%(lineno)s] %(asctime)s > %(message)s')

    # 콘솔 스트림, 로그 파일 생성
    console = logging.StreamHandler()
    file_handler = logging.FileHandler(filename='./log/log.log')
    socket_handler = UTF8SocketHandler(host, port)

    # handler 별로 다른 level 설정
    console.setLevel(logging.INFO)
    file_handler.setLevel(logging.INFO)
    socket_handler.setLevel(logging.INFO)

    # handler 출력 format 지정
    console.setFormatter(log_format)
    file_handler.setFormatter(log_format)
    socket_handler.setFormatter(log_format)

    # logger에 handler 추가
    logger.addHandler(console)
    logger.addHandler(file_handler)
    logger.addHandler(socket_handler)
    return logger