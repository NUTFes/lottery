from controllers import *


# FastAPIのルーティング用関数
app.add_api_route('/', index, methods=['GET', 'POST'])
app.add_api_route('/admin', admin, methods=['GET', 'POST'])
app.add_api_route('/add', add, methods=['POST'])
app.add_api_route('/delete/{t_id}', delete)
app.add_api_route('/delete_place/{p_id}', delete_place)
app.add_api_route('/add_place', add_place, methods=['POST'])
app.add_api_route('/{p_id}', place, methods=['GET', 'POST'])

# JSONで返すAPI
app.add_api_route('/get', get)