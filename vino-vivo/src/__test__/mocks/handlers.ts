
import { http, HttpResponse } from 'msw';
import { server } from './server';

server.listen()

const handlers = [


  http.get('http://localhost:8082/product/all', () => {
  
    return HttpResponse.json(
      [
        { id: 1, name: 'Product 1', description: 'Description 1', image: '/image1.jpg', price: 100, idVariety: '1' },
        { id: 2, name: 'Product 2', description: 'Description 2', image: '/image2.jpg', price: 200, idVariety: '2' }
      ])
  }),

  http.get('http://lhttp://localhost:8082/variety/id/1ocalhost:8082/product/id/1', () => {
  
  return HttpResponse.json(
    [
      { name: 'Variety 1' }
    ])
}),

http.get('http://localhost:8082/variety/id/2', () => {
  
return HttpResponse.json(
  [
    { name: 'Variety 2' }
  ])
}),



];


export { handlers };