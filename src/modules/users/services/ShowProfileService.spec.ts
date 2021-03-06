import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		showProfileService = new ShowProfileService(fakeUsersRepository);
	});

	it('should be able to show the profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'joao',
			email: 'joao@gmail.com',
			password: '123123',
		});

		const profile = await showProfileService.execute({
			user_id: user.id,
		});

		expect(profile.name).toBe('joao');
		expect(profile.email).toBe('joao@gmail.com');
	});

	it('should not be able to show the profile from non-existing user', async () => {
		await expect(
			showProfileService.execute({
				user_id: 'non-existing user',
			})
		).rejects.toBeInstanceOf(AppError);
	});
});
