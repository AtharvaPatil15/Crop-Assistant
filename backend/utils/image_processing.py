def preprocess_image(image):
    # Resize the image to the required input size for the model
    image = image.resize((224, 224))  # Example size, adjust as needed
    # Normalize the image
    image = (image - 128) / 128  # Example normalization, adjust as needed
    return image

def load_image(image_path):
    from PIL import Image
    image = Image.open(image_path)
    return image

def convert_image_to_tensor(image):
    import torchvision.transforms as transforms
    transform = transforms.ToTensor()
    return transform(image).unsqueeze(0)  # Add batch dimension

def postprocess_output(output):
    # Convert model output to a more interpretable format
    _, predicted = output.max(1)
    confidence = output.softmax(dim=1).max().item()
    return predicted.item(), confidence