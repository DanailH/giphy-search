import { useQuery } from './helperHooks';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    search: 'q=test',
  }),
}));

it('returns URLSearchParams object with "q" param that is equal to "test"', () => {
  const result = useQuery();

  expect(result.get('q')).toEqual('test');
});