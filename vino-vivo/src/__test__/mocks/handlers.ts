import { setupServer } from 'msw/node';
import { http, RequestHandler } from 'msw';

interface CustomHttp {
  [key: string]: RequestHandler;
}

const handlers = [
  {
    method: 'get', 
    url: 'http://localhost:8082/product/all',
    response: (req: any, res: any, ctx: any) => {
      return res(
        ctx.status(200),
        ctx.json([
          { id: 1, name: 'Product 1', description: 'Description 1', image: '/image1.jpg', price: 100, idVariety: '1' },
          { id: 2, name: 'Product 2', description: 'Description 2', image: '/image2.jpg', price: 200, idVariety: '2' }
        ])
      );
    }
  },
  {
    method: 'get', 
    url: 'http://localhost:8082/variety/id/1',
    response: (req: any, res: any, ctx: any) => {
      return res(
        ctx.status(200),
        ctx.json({ name: 'Variety 1' })
      );
    }
  },
  {
    method: 'get', 
    url: 'http://localhost:8082/variety/id/2',
    response: (req: any, res: any, ctx: any) => {
      return res(
        ctx.status(200),
        ctx.json({ name: 'Variety 2' })
      );
    }
  }
];


export { handlers };