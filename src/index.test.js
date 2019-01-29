/* eslint-disable */
import React from "react";
import { Span } from "./components/span.js";
import timer from "./business/timer.js";
import renderer from "react-test-renderer";


describe.skip( 'timers',()=>{
	jest.useFakeTimers();
	
	it('tests setTimeout',(done)=>{
		timer((data)=>{
			expect(data).toBe('doggy');
			done();
		});

		jest.runAllTimers();

		expect(setTimeout).toHaveBeenCalledTimes(1);
		//expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function));
	})
})



describe.skip("Snapshots!! - ", () => {
  it("creates 1st snapshot", () => {
    const r = renderer.create(<Span word="what up ma niggas" />).toJSON();

	  expect(r).toMatchSnapshot();
  });

  it("creates inline snapshot", () => {
    const r = renderer.create(<Span word="what up ma niggas" />).toJSON();

    expect(r).toMatchInlineSnapshot(`
Array [
  <span
    className="absolute bottom left right z-index-1 opacity-8"
  >
    word of the day : 
    what up ma niggas
  </span>,
  <br />,
]
`);
  });


	it('creates mutable snapshot',()=>{
		const poop = {
			step1 : 'go to loo',
			step2 : 'open door',
			step3 : 'step inside',
			step4 : 'do your ehlere thing starting at',
			step5 : new Date(),
		}

		expect( poop ).toMatchSnapshot({
			step4 : expect.any(String),
			step5:expect.any(Date),
		})
	});
});

/*
describe('testng promises',()=>{
	it('completes successfully',(done)=>{
		new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(40)
			},100 )
		}).then( val=>{
			expect( val ).toBe(40);
			done();
		});
	})

	it('fancier promises',()=>{
		let p = Promise.resolve('peanut butter')

		return p.then(data=>{
			expect(data).toBe('peanut butter');
		})
	})

	it('promise should fail',()=>{
		let p = Promise.reject('peanut butter')

		expect.assertions(1);

		return p.then(data=>{
			expect(data).toBe('peanut butter');
		}).catch(err=>{
			expect(err).toMatch('peanut butter');
		})
	})

	it('promise fancier',()=>{
		let p = Promise.resolve('hello world')

		expect.assertions(1);

		return expect(p).resolves.toBe('hello world');
	})

	it('uses async - fake sychronous code',async ()=>{
		const p = Promise.reject('chicken');

		expect.assertions(1);

		await expect(p).rejects.toBe('chicken');
	})

})
*/
