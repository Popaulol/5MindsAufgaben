import pygame
from pygame.surface import Surface
from pygame.tests.time_test import Clock

import Config

def main():
    pygame.init()
    screen: Surface = pygame.display.set_mode(Config.SCREEN_RES)
    clock: Clock = pygame.time.Clock()
    print("Pygame wurde initialisiert -- Füge nun einen Hintergrund und Boden ein.")


    
if __name__ == "__main__":
    main()
