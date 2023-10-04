create_folder() {
    local dirct="$1"
    local folderName="$2"

    if [ -d "$dirct" ]; then
        # Check if the target directory exists
        if [ ! -d "$dirct/$folderName" ]; then
            # Check if the folder with the given name doesn't already exist
            mkdir "$dirct/$folderName"
            echo "Folder '$folderName' created in '$dirct'."
        else
            echo "Folder '$folderName' already exists in '$dirct'."
        fi
    else
        echo "Target directory '$dirct' does not exist."
    fi
}