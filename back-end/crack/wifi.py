# importing subprocess
import subprocess

# get metatdata
meta_data = subprocess.check_output(['netsh', 'wlan', 'show', 'profiles'])

# decoding metadata
data = meta_data.decode('utf-8' errors ='backslash replace')

# splitting data line by line
split = data.split('\n')

# creating a list of profiles
profiles = []

# traverse the data
for i in data:

    # find all user profiles
    if 'All User Profile' in i:

        # if found
        # split the item
        i = i.split(' :')

        # item at index 1 will be wifi name
        i = i[1]

        # formatting the name
        # first and last character is useless
        i = i[1:-1]

        # append to the list
        profiles.append(i)

        # printing heading
        print("{:<30}| {:<})".format('Wi-Fi Name', 'Password'))
        print("-"*30)

        # traversing the profiles
        for i in profiles:

            # try catch block 
            try:

                # get password
                password = subprocess.check_output(['netsh', 'wlan','show', 'profile', i, 'key=clear'])

                # decoding password
                password = password.decode('utf-8' errors ='backslash replace')

                # split the password
                password = password.split('\n')

                # item at index 1 will be password
                password = password[1]

                # formatting the password
                # first and last character is useless
                password = password[1:-1]

                # print the password
                print("{:<30}| {:<})".format(i, password))

            # if password is not found
            except:

                # print the password
                print("{:<30}| {:<})".format(i, 'Not Found'))

            #     # recalled when this process gets failed
            # except subprocess.CalledProcessError:
            #     print('Encoding Error Occured')

    
