from flask import Flask, request, jsonify
import random
import string

app = Flask(__name__)

def generate_password(options):
    length = options.get('length', 8)
    use_special = options.get('special', False)
    use_upper = options.get('uppercase', False)
    use_lower = options.get('lowercase', True)
    use_numbers = options.get('numbers', False)
    specific_letters = options.get('specific_letters', '')
    specific_numbers = options.get('specific_numbers', '')

    specific_letters = list(specific_letters)
    specific_numbers = list(specific_numbers)

    password_pool = ''
    guaranteed_chars = []

    if use_special:
        password_pool += string.punctuation
    if use_upper or use_lower:
        password_pool += string.ascii_letters
    if use_numbers:
        password_pool += string.digits

    guaranteed_chars.extend(specific_letters)
    guaranteed_chars.extend(specific_numbers)

    if len(guaranteed_chars) > length:
        return f"Error: O tamanho da senha é muito curto para todos os caracteres", False

    remaining_length = length - len(guaranteed_chars)
    if remaining_length > 0:
        password_pool += ''.join(specific_letters + specific_numbers)
        guaranteed_chars.extend(random.choices(password_pool, k=remaining_length))

    random.shuffle(guaranteed_chars)
    return ''.join(guaranteed_chars), True

@app.route('/', methods=['POST'])
def generate():
    options = request.json
    password, success = generate_password(options)
    if success:
        return jsonify({"password": password})
    else:
        return jsonify({"error": password}), 400

if __name__ == '__main__':
    app.run(port=5000)