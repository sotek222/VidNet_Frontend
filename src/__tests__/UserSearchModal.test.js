import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import UserSearchModal from '../components/UserSearchModal';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('UserSearchModal', () => {
  it('fetches data from server when server returns a successful response', (done) => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const wrapper = shallow(<UserSearchModal />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    // expect(global.fetch).toHaveBeenCalledWith('https://url-of-your-server.com/example/json');

    done();
  });
});