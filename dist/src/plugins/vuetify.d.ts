export declare const useVuetify: {
    install: (app: import('vue').App) => void;
    defaults: import('vue').Ref<import('vuetify').DefaultsInstance>;
    display: import('vuetify').DisplayInstance;
    theme: import('vuetify').ThemeInstance & {
        install: (app: import('vue').App) => void;
    };
    icons: {
        defaultSet: string;
        aliases: Partial<import('vuetify').IconAliases>;
        sets: Record<string, import('vuetify').IconSet>;
    };
    locale: {
        isRtl: import('vue').Ref<boolean>;
        rtl: import('vue').Ref<Record<string, boolean>>;
        rtlClasses: import('vue').Ref<string>;
        name: string;
        messages: import('vue').Ref<import('vuetify').LocaleMessages>;
        current: import('vue').Ref<string>;
        fallback: import('vue').Ref<string>;
        t: (key: string, ...params: unknown[]) => string;
        n: (value: number) => string;
        provide: (props: import('vuetify').LocaleOptions) => import('vuetify').LocaleInstance;
    };
    date: {
        options: {
            adapter: (new (options: {
                locale: any;
                formats?: any;
            }) => import('vuetify').DateInstance) | import('vuetify').DateInstance;
            formats?: Record<string, any>;
            locale: Record<string, any>;
        };
        instance: {
            locale?: any;
            date: (value?: any) => unknown;
            format: (date: unknown, formatString: string) => string;
            toJsDate: (value: unknown) => Date;
            parseISO: (date: string) => unknown;
            toISO: (date: unknown) => string;
            startOfDay: (date: unknown) => unknown;
            endOfDay: (date: unknown) => unknown;
            startOfWeek: (date: unknown, firstDayOfWeek?: number | string) => unknown;
            endOfWeek: (date: unknown) => unknown;
            startOfMonth: (date: unknown) => unknown;
            endOfMonth: (date: unknown) => unknown;
            startOfYear: (date: unknown) => unknown;
            endOfYear: (date: unknown) => unknown;
            isAfter: (date: unknown, comparing: unknown) => boolean;
            isAfterDay: (value: unknown, comparing: unknown) => boolean;
            isSameDay: (date: unknown, comparing: unknown) => boolean;
            isSameMonth: (date: unknown, comparing: unknown) => boolean;
            isSameYear: (value: unknown, comparing: unknown) => boolean;
            isBefore: (date: unknown, comparing: unknown) => boolean;
            isEqual: (date: unknown, comparing: unknown) => boolean;
            isValid: (date: any) => boolean;
            isWithinRange: (date: unknown, range: [unknown, unknown]) => boolean;
            addMinutes: (date: unknown, amount: number) => unknown;
            addHours: (date: unknown, amount: number) => unknown;
            addDays: (date: unknown, amount: number) => unknown;
            addWeeks: (date: unknown, amount: number) => unknown;
            addMonths: (date: unknown, amount: number) => unknown;
            getYear: (date: unknown) => number;
            setYear: (date: unknown, year: number) => unknown;
            getDiff: (date: unknown, comparing: unknown, unit?: string) => number;
            getWeekArray: (date: unknown, firstDayOfWeek?: number | string) => unknown[][];
            getWeekdays: (firstDayOfWeek?: number | string) => string[];
            getMonth: (date: unknown) => number;
            setMonth: (date: unknown, month: number) => unknown;
            getDate: (date: unknown) => number;
            setDate: (date: unknown, day: number) => unknown;
            getNextMonth: (date: unknown) => unknown;
            getPreviousMonth: (date: unknown) => unknown;
            getHours: (date: unknown) => number;
            setHours: (date: unknown, hours: number) => unknown;
            getMinutes: (date: unknown) => number;
            setMinutes: (date: unknown, minutes: number) => unknown;
        };
    };
    goTo: import('vuetify').GoToInstance;
};
