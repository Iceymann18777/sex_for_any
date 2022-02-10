const Home = { template: '<div>Ремонты</div>' }
const Bar = { template: '<div>ГСМ</div>' }

const routes =[ 
{ path: '/home', name:'construction', component: Home },
{ path: '/bar', name: 'gsm', component: Bar },
{ path: '/login', name: 'login', component: Login },
{ path: '/notes', name: 'notes', component: Notes, meta: { requiresAuth: true } }
]
const router = new VueRouter({/*mode:'history',*/ base: '/test_vue', routes})

router.beforeEach((to, from, next)=>{
	if(to.matched.some(record => record.meta.requiresAuth)){
		if(store.getters.loggedIn){
			next()
			return
			}
			next('/login')
		}else{ 
			next()
			}
	})
