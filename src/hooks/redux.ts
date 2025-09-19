import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';



/**
 * Actions
 * @returns Typed dispatch hook for Redux actions
 * @description Custom hooks to use throughout the app for typed Redux dispatch and selector.
 * @functon useAppDispatch
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();


/**
 * Selectors
 * @returns Typed selector hook for Redux state
 * @description Custom hook to use throughout the app for typed Redux state selection.
 * @function useAppSelector
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;