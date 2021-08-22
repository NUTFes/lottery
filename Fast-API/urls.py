from controllers import *


# FastAPIのルーティング用関数
app.add_api_route('/', index)
app.add_api_route('/admin', admin, methods=['GET', 'POST'])
app.add_api_route('/register', register, methods=['GET', 'POST'])
app.add_api_route('/add', add, methods=['POST'])
app.add_api_route('/delete/{t_id}', delete)

# JSONで返すAPI
app.add_api_route('/get', get)