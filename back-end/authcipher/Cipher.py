import hashlib
import secrets

class RollingCipher:
    def __init__(self, base_password):
        self.base_password = base_password
        self.current_index = 0

    def generate_password(self):
        password = self.base_password + str(self.current_index) + secrets.token_hex(16)
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        self.current_index += 1
        return hashed_password

class UserManager:
    def __init__(self):
        self.users = {}

    def add_user(self, username, password):
        if username not in self.users:
            rolling_cipher = RollingCipher(password)
            self.users[username] = {"hashed_password": rolling_cipher.generate_password(), "rolling_cipher": rolling_cipher, "login_attempts": 0}
            print(f"User '{username}' added successfully.")
        else:
            print(f"User '{username}' already exists.")

    def authenticate_user(self, username, entered_password):
        if username in self.users:
            user_data = self.users[username]
            expected_password = user_data["rolling_cipher"].generate_password()

            if entered_password == expected_password:
                print(f"User '{username}' authenticated successfully.")
                user_data["login_attempts"] = 0  # Reset login attempts on successful authentication
            else:
                user_data["login_attempts"] += 1
                print(f"Authentication failed for user '{username}'. Incorrect password.")

                if user_data["login_attempts"] >= 3:
                    del self.users[username]
                    print(f"User '{username}' account data permanently deleted due to multiple incorrect password attempts.")
        else:
            print(f"User '{username}' not found.")

# Example usage:
user_manager = UserManager()

user_manager.add_user("john_doe", "password123")
user_manager.add_user("jane_smith", "qwerty")

user_manager.authenticate_user("john_doe", "wrong_password")
user_manager.authenticate_user("john_doe", "wrong_password")
user_manager.authenticate_user("john_doe", "wrong_password")  # Account data will be permanently deleted
