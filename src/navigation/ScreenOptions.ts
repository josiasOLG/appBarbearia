import {StackNavigationOptions} from '@react-navigation/stack';

export const noHeaderOption: StackNavigationOptions = {
  headerShown: false,
};

export const customHeaderOption = (
  backgroundColor?: string,
  headerTintColor?: string,
  title: string = '', // Default value set here, removed the optional '?'
  headerBackTitle: string = '', // Default value set here, removed the optional '?'
  headerBackTitleVisible: boolean = true, // Default value already set, removed the optional '?'
  headerBackTintColor: string = '', // Default value set here, removed the optional '?'
): StackNavigationOptions => ({
  headerShown: false,
  headerStyle: {
    backgroundColor: backgroundColor,
  },
  headerTintColor: headerTintColor,
  title: title,
  headerBackTitle: headerBackTitle,
  headerBackTitleVisible: headerBackTitleVisible,
  headerBackTintColor: headerBackTintColor || headerTintColor, // Use the same tint color for back button if not specified
});

export const hiddenBackButtonOption: StackNavigationOptions = {
  headerBackTitleVisible: false,
};
