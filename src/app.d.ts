// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		cocoSsd: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			load: () => Promise<any>;
		}
	}

	// ------------------------------------------------------------------------------------------------
	// ---------------------------------------- STYLES TYPES ------------------------------------------
	// ------------------------------------------------------------------------------------------------
	export type Theme = 'primary' | 'accent1' | 'accent2' | 'accent3' | 'light' | 'neutral' | 'danger' | 'success';
}

export {};
