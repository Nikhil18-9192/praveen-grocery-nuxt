import cookies from 'cookie'
export default async function ({ store, req, res, route, redirect }) {
    const user = store.state.user

    const mapRoute = /\/map\/*/g
    const addShopRoute = /\/add-shop\/*/g
    const authRoute = /\/login\/*/g
    const adminRoute = /\/admin\/*/g



    if (route.path.match(mapRoute)) {
        if (!user) redirect('/login')
    }

    if (route.path.match(addShopRoute)) {
        if (!user) redirect('/login')
    }

    if (route.path.match(adminRoute)) {
        if (!user) redirect('/login')
    }

    if (route.path.match('/admin')) {
        if (user && user.role.type !== 'admin') {
            redirect('/')
        }
    }





    if (route.path.match(authRoute)) {
        if (user && user.role.type !== 'admin') {
            redirect('/')
        }

        if (user && user.role.type == 'admin') {
            redirect('/admin')
        }

    }

}