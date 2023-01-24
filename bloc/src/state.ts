import { BlacReact } from 'blac';
//@ts-ignore
import UsersCubit from './users_bloc/users_cubit.ts';

const state = new BlacReact([
    new UsersCubit()
]);

export const { useBloc } = state;