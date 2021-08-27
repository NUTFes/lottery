from controllers import *


# FastAPIのルーティング用関数
# index
app.add_api_route('/', index, methods=['GET', 'POST'])
app.add_api_route('/add', add_place, methods=['POST'])
app.add_api_route('/delete/{p_id}', delete_place)
# place
app.add_api_route('/admin', admin, methods=['GET', 'POST'])
app.add_api_route('/admin/add', add_log, methods=['POST'])
app.add_api_route('/admin/delete/{t_id}', delete_log)
app.add_api_route('/place?id={p_id}', place, methods=['GET', 'POST'])
app.add_api_route('/place?id={p_id}/add', add_log, methods=['POST'])
app.add_api_route('/place?id={p_id}/delete/{t_id}', delete_log)




# JSONで返すAPI
app.add_api_route('/get', get)